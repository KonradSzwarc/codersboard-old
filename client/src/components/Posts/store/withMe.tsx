import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { MainPermission, Institution } from 'types/User';

export const ME = gql`
  {
    me {
      id
      fullName
      profileURL
      image
      email
      companyEmail
      phone
      role
      permissions
      university {
        id
        name
      }
      universityDepartment
      fieldOfStudy
      year
      indexNumber
      institution
      skills {
        skill {
          id
        }
      }
      slackId
      credentials {
        id
        name
        login
        password
      }
      special
    }
  }
`;

export default (WrapperComponent: any) => (props: any) => (
  <Query<Data, {}> query={ME}>{({ data }) => <WrapperComponent {...props} me={data.me} />}</Query>
);

export interface IMe {
  id: string;
  fullName: string;
  profileURL: string;
  image: string;
  email: string;
  companyEmail?: string;
  phone?: string;
  role: string;
  skills: {
    skill: {
      id: string;
    };
  }[];
  permissions: MainPermission[];
  university?: {
    id: string;
    name: string;
  };
  universityDepartment?: string;
  fieldOfStudy?: string;
  year?: number;
  indexNumber?: number;
  institution: Institution[];
  slackId?: string;
  credentials?: {
    id: string;
    name: string;
    login: string;
    password: string;
  }[];
  special?: string[];
}

export interface Data {
  me: IMe;
}

export interface IWithMe {
  me: IMe;
  meLoading: boolean;
}
