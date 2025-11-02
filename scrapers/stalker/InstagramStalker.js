const axios = require("axios");

async function igstalk(username) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(
        `https://www.instagram.com/${username}/?__a=1&__d=dis`,
        {
          headers: {
            "user-agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
            "accept-language": "en-US,en;q=0.9",
          },
        }
      );

      const user = data?.graphql?.user;
      if (!user) return reject("User not found or profile is private.");

      const result = {
        id: user.id,
        username: user.username,
        fullName: user.full_name,
        biography: user.biography,
        profilePicHD: user.profile_pic_url_hd,
        followers: user.edge_followed_by.count,
        following: user.edge_follow.count,
        postsCount: user.edge_owner_to_timeline_media.count,
        highlightCount: user.highlight_reel_count,
        isBusinessAccount: user.is_business_account,
        isPrivate: user.is_private,
        isVerified: user.is_verified,
        isRecentUser: user.is_joined_recently,
        accountCategory: user.business_category_name,
        linkedFacebookPage: user.connected_fb_page
      };

      resolve(result);
    } catch (err) {
      reject(err.message || err);
    }
  });
}

module.exports = { igstalk };