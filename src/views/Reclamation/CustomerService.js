export const CustomerService = {
  getData() {
    return [
      {
        id: 1,
        date: "10/12/2023",
        customername: "Shankar",
        mobilenumber: "9876543210",
        redemptioningrams: "16g",
        value: "120000",
        couponnumber: "ANHGAWER125678KM",
        status: "",
      },
      {
        id: 2,
        date: "06/12/2023",
        customername: "Shiva",
        mobilenumber: "9876543210",
        redemptioningrams: "16g",
        value: "120000",
        couponnumber: "ANHGAWER125678KM",
        status: "",
      },
      {
        id: 3,
        date: "11/12/2023",
        customername: "Vishwa",
        mobilenumber: "9876543210",
        redemptioningrams: "16g",
        value: "120000",
        couponnumber: "ANHGAWER125678KM",
        status: "",
      },
      {
        id: 4,
        date: "06/12/2023",
        customername: "Ram",
        mobilenumber: "9876543210",
        redemptioningrams: "16g",
        value: "120000",
        couponnumber: "ANHGAWER125678KM",
        status: "",
      },
      {
        id: 5 ,
        date: "10/12/2023",
        customername: "Shankar",
        mobilenumber: "9876543210",
        redemptioningrams: "16g",
        value: "120000",
        couponnumber: "ANHGAWER125678KM",
        status: "",
      },
      
    ];
  },

  getCustomersSmall() {
    return Promise.resolve(this.getData().slice(0, 10));
  },

  getCustomersMedium() {
    return Promise.resolve(this.getData().slice(0, 50));
  },

  getCustomersLarge() {
    return Promise.resolve(this.getData().slice(0, 200));
  },

  getCustomersXLarge() {
    return Promise.resolve(this.getData());
  },

  getCustomers(params) {
    const queryParams = params
      ? Object.keys(params)
          .map(
            (k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k])
          )
          .join("&")
      : "";

    return fetch(
      "https://www.primefaces.org/data/customers?" + queryParams
    ).then((res) => res.json());
  },
};
