import { google } from 'googleapis';

export default class GoogleOAuth2Authentication {
  public oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URIS
  );
  public scopes = ['https://www.googleapis.com/auth/gmail.readonly'];

  async getAuthUrl() {
    const url = this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: this.scopes,
    });

    return url;
  }
}
