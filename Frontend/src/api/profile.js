export async function getProfile() {
    try {
      const response = await fetch("http://localhost:5000/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      return data; // Return directly
    } catch (error) {
      console.error("Error fetching profile:", error);
      throw error;
    }
  }
  