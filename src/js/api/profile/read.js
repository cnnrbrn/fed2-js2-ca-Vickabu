import { API_SOCIAL_PROFILES } from "../constants";
import { headers } from "../headers";

/**
 * Fetches the profile data for a given user by their name.
 *
 * @param {string} name - The username of the profile to fetch.
 * @returns {Promise<Object|undefined>} A promise that resolves to the profile data object if response ok.
 *                                      If not, returns `undefined`.
 * @throws {Error} Logs any errors that occur during the fetch process.
 *
 * @example
 * // Example usage:
 * const profileData = await readProfile('john_doe');
 * console.log(profileData);
 */

export async function readProfile(name) {
  try {
    const response = await fetch(`${API_SOCIAL_PROFILES}/${name}`, {
      method: "GET",
      headers: headers(),
    });
    if (response.ok) {
      const data = await response.json();
      return data.data;
    } else {
      console.error("Failed to fetch profile:", response.status);
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
}

/**
 * Fetches a list of profiles with optional pagination.
 *
 * **Note:** This function is currently not implemented and is only partially set up.
 * It may not function as intended until fully developed.
 *
 * @param {number} [limit=12] - The maximum number of profiles to retrieve (default is 12).
 * @param {number} [page=1] - The page number to retrieve (default is 1).
 * @returns {Promise<Array<Object>|undefined>} A promise that resolves to an array of profile data objects.
 *                                             If no profiles are found or if the fetch fails, it returns undefined.
 * @throws {Error} Logs any errors that occur during the fetch process.
 *
 * @example
 * // Example usage (if implemented):
 * readProfiles(5, 1)
 *   .then(profiles => console.log(profiles))
 *   .catch(error => console.error("Error fetching profiles:", error));
 */

// export async function readProfiles(limit = 12, page = 1) {
//     try {
//         const params = new URLSearchParams({
//             limit: limit.toString(),
//             page: page.toString(),
//         });

//         const response = await fetch(`${API_SOCIAL_PROFILES}?${params}`, {
//             method: "GET",
//             headers: headers(),
//         });
//         if (response.ok) {
//             const data = await response.json();
//             return data;
//         }
//     } catch (error) {
//         console.error("Error fetching profiles:", error);
//     }
// }
