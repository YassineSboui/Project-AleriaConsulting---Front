import { gql } from "@apollo/client";

export const CHECK_TOKEN = gql`
  query checkAccesToken($token: String) {
    checkAccesToken(token: $token)
  }
`;

export const GET_PANEL_BY_COMPANY_ID = gql`
  query get($id: ID) {
    getPanelByCompanyID(id: $id) {
      _id
      address
      company_id
      day_price
      days_discount
      discount_day_price
      heigh
      latitude
      longitude
      maximum_actif_promotion_at_once
      number_actif_promotion
      pitch
      title
      width
      is_active
    }
  }
`;
export const PAGINATE_ACCEPTED_REQUEST = gql`
  query getRequestsTotalMoneyAndNumbers($after: Int, $pageSize: Int) {
    paginateAcceptedRequest(after: $after, pageSize: $pageSize) {
      size
      hasMore
      requests {
        _id
        company_id
        email_requester
        ending_date
        name_require
        panel_id
        phone_require
        days_number
        social_reason
        starting_date
        total_price
        status
        created_at
        message
      }
    }
  }
`;
export const GET_ALL_PANELS = gql`
  query getAllPanels {
    getAllPanels {
      _id
      address
      company_id
      day_price
      days_discount
      discount_day_price
      heigh
      latitude
      longitude
      maximum_actif_promotion_at_once
      number_actif_promotion
      pitch
      title
      width
      is_active
    }
  }
`;

export const GET_REQUEST_BY_COMPANY_ID = gql`
  query getRequestByCompanyId($id: ID) {
    findRequestByCompanyId(id: $id) {
      _id
      company_id
      email_requester
      ending_date
      name_require
      panel_id
      phone_require
      days_number
      social_reason
      starting_date
      total_price
      status
      created_at
      message
    }
  }
`;
export const GET_REQUEST_BY_SPECIFIC_DATES_AND_PANEL_ID = gql`
  query findSpecificRequestByPanel(
    $id: ID
    $ending_date: String
    $starting_date: String
    $status: String
  ) {
    findSpecificRequestByPanel(
      id: $id
      ending_date: $ending_date
      starting_date: $starting_date
      status: $status
    ) {
      _id
    }
  }
`;
export const GET_COMPANY_BY_ID = gql`
  query getCompanyById($id: ID) {
    getCompanyByID(id: $id) {
      _id
      e_mail
      name
      phone
      trade_register_number
    }
  }
`;
export const GET_TOTAL_INCOM_AND_ACCEPTED_REQUEST = gql`
  query getRequestsTotalMoneyAndNumbers {
    getRequestsTotalMoneyAndNumbers {
      totalAds
      income
    }
  }
`;
export const GET_USER_BY_ID = gql`
  query getUserByID($id: ID) {
    getUserByID(id: $id) {
      _id
      birth_date
      e_mail
      company_id
      first_name
      last_name
      is_activated
      phone_num
      role
      auth_user_id
      activation_code
      created_at
      is_enabled
    }
  }
`;
export const GET_USERS_BY_COMPANY_ID = gql`
  query getUsrsByCompanyID($id: ID) {
    getUserByCompanyId(id: $id) {
      _id
      birth_date
      e_mail
      company_id
      first_name
      last_name
      is_activated
      phone_num
      role
      auth_user_id
      activation_code
      created_at
      is_enabled
    }
  }
`;
export const GET_PANEL_BY_ID = gql`
  query getPanelByID($id: ID) {
    getPanelById(id: $id) {
      _id
      width
      address
      day_price
      days_discount
      discount_day_price
      heigh
      title
      latitude
      longitude
      maximum_actif_promotion_at_once
      number_actif_promotion
      pitch
      is_active
      requests {
        _id
        company_id
        email_requester
        ending_date
        name_require
        panel_id
        phone_require
        days_number
        social_reason
        starting_date
        total_price
        status
        created_at
        message
      }
    }
  }
`;

export const GET_NOTIF_BY_COMANY_ID_NEW = gql`
  query findNotif($status: String, $company_id: String) {
    fincNotificationByCompanyIdAndStatus(
      status: $status
      company_id: $company_id
    ) {
      _id
      issue_date
      message
      rank
      title
      status
      company_id
      entity_id
      entity_name
    }
  }
`;

export const GET_REQUEST_BY_ID = gql`
  query findRequestById($id: ID) {
    findRequestById(id: $id) {
      _id
      company_id
      email_requester
      ending_date
      name_require
      panel_id
      phone_require
      days_number
      social_reason
      starting_date
      total_price
      status
      created_at
      message
    }
  }
`;

export const GET_ALL_COMPANIES = gql`
  query getAll {
    getAll {
      _id
      name
      phone
      trade_register_number
      e_mail
    }
  }
`;
export const PAGINATE_USERS = gql`
  query paginateUsers($after: Int, $pageSize: Int, $query: String) {
    queryUsers(after: $after, pageSize: $pageSize, query: $query) {
      hasMore
      size
      users {
        _id
        birth_date
        e_mail
        company_id
        first_name
        last_name
        is_activated
        phone_num
        role
        auth_user_id
        activation_code
        created_at
        is_enabled
        company {
          _id
          name
        }
      }
    }
  }
`;

export const PAGINATE_REQUEST = gql`
  query paginateRequest($after: Int, $pageSize: Int) {
    requestPagination(after: $after, pageSize: $pageSize) {
      hasMore
      size
      requests {
        _id
        email_requester
        phone_require
        name_require
        starting_date
        total_price
        ending_date
        company_id
        panel_id
        social_reason
        status
        days_number
        created_at
        message
      }
    }
  }
`;
export const PAGINATE_PANELS = gql`
  query paginatePanels($after: Int, $pageSize: Int) {
    paginatePanels(after: $after, pageSize: $pageSize) {
      hasMore
      size
      panels {
        _id
        address
        company_id
        day_price
        days_discount
        discount_day_price
        heigh
        latitude
        longitude
        maximum_actif_promotion_at_once
        number_actif_promotion
        pitch
        title
        width
        is_active
      }
    }
  }
`;
