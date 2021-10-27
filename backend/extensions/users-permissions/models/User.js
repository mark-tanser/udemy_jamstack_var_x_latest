module.exports = {
    /**
     * Triggered before user creation.
     */
    lifecycles: {
      async beforeCreate(data) {
        data.paymentMethods = [
            {brand: "", last4: ""},
            {brand: "", last4: ""},
            {brand: "", last4: ""}
        ]
        data.contactInfo = [
            {name: data.username, email: data.email, phone: ""},
            {name: "", email: "", phone: ""},
            {name: "", email: "", phone: ""}
        ]
        data.locations = [
            {street: "", zip: "", city: "", state: ""},
            {street: "", zip: "", city: "", state: ""},
            {street: "", zip: "", city: "", state: ""}
        ]
      },
    },
  };