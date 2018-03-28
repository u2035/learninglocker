/**
 * Parse profile.
 *
 * Parses user profiles as fetched from Google's OpenID Connect-compatible user
 * info endpoint.
 *
 * The amount of detail in the profile varies based on the scopes granted by the
 * user.  The following scope values add additional data:
 *
 *     `profile` - basic profile information
 *     `email` - email address
 *
 * References:
 *   - https://developers.google.com/identity/protocols/OpenIDConnect
 *
 * @param {object|string} json
 * @return {object}
 * @access public
 */
exports.parse = function(json) {
  if ('string' == typeof json) {
    json = JSON.parse(json);
  }

  var profile = {};
  profile.id = json.email;
  profile.displayName = json.username;
  if (json.email) {
    profile.emails = [ { value: json.email, verified: json.email, type: 'account' } ];
  }
  if (json.image) {
    profile.photos = [{ value: json.image }];
  }

  return profile;
};
