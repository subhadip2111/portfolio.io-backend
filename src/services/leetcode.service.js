const axios = require('axios');

async function fetchLeetCodeData(username) {
    const query = `
    query userProblemsSolved($username: String!) {
      allQuestionsCount {
        difficulty
        count
      }
      matchedUser(username: $username) {
        problemsSolvedBeatsStats {
          difficulty
          percentage
        }
          submissionCalendar
        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
             profile {
        reputation
        ranking
      }
      }
    recentSubmissionList(username: $username) {
      title
      titleSlug
      timestamp
      statusDisplay
      lang
      __typename
    }
    }
  `;



    // const query = `
    //   query getUserProfile($username: String!) {
    //     allQuestionsCount {
    //       difficulty
    //       count
    //     }
    //     matchedUser(username: $username) {
    //       contributions {
    //         points
    //       }
    //       profile {
    //         reputation
    //         ranking
    //       }
    //       submissionCalendar
    //       submitStats {
    //         acSubmissionNum {
    //           difficulty
    //           count
    //           submissions
    //         }
    //         totalSubmissionNum {
    //           difficulty
    //           count
    //           submissions
    //         }
    //       }
    //     }
    //     recentSubmissionList(username: $username) {
    //       title
    //       titleSlug
    //       timestamp
    //       statusDisplay
    //       lang
    //       __typename
    //     }
    //     matchedUserStats: matchedUser(username: $username) {
    //       submitStats: submitStatsGlobal {
    //         acSubmissionNum {
    //           difficulty
    //           count
    //           submissions
    //           __typename
    //         }
    //         totalSubmissionNum {
    //           difficulty
    //           count
    //           submissions
    //           __typename
    //         }
    //         __typename
    //       }
    //     }
    //   }
    // `;
    const variables = { username };

    try {
        const response = await axios.post(
            'https://leetcode.com/graphql',
            {
                query,
                variables
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        const data = response.data.data;
        console.log(data)
        // if (!data?.matchedUser) return null;

        return data

    } catch (error) {
        console.error("LeetCode GraphQL fetch failed:", error.message);
        return null;
    }
}

module.exports = { fetchLeetCodeData };
