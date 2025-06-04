import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "admin-api/vectara-admin-rest-api",
    },
    {
      type: "category",
      label: "Customers",
      link: {
        type: "doc",
        id: "admin-api/customers",
      },
      items: [
        {
          type: "doc",
          id: "admin-api/list-customers",
          label: "List customers",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
