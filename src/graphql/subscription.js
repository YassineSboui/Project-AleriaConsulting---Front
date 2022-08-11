import { gql } from "@apollo/client";

export const NOTIFICATION_SUBSCRIPTION = gql`
  subscription OnCommentAdded($company_id: String) {
    notify(company_id: $company_id) {
      _id
      issue_date
      title
      message
      entity_id
      entity_name
      rank
      status
      company_id
    }
  }
`;
