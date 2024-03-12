// index.js

exports.handler = async (event) => {
  try {
      console.log("Purchase completed. Alerting Hello...");
      // You can replace this with the actual alert mechanism, such as sending an email or notification
      return "Hello";
  } catch (error) {
      console.error("Error alerting Hello:", error);
      throw error;
  }
};
