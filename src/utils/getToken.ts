export const getToken = async () => {
      const response = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        body: JSON.stringify({
          client_id:
            "1054487361163-1e9605etku73n5htfem15k7oh44m3jrn.apps.googleusercontent.com",
          client_secret: "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",
          grant_type: "refresh_token",
          refresh_token: process.env.GATSBY_REFRESH_TOKEN,
        }),
      });
      const responseJson = await response.json() as { access_token: string};
      return responseJson.access_token ?? '';
}