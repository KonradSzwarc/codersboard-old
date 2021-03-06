import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export const SUCCESSES = gql`
  {
    successes(orderBy: date_DESC) {
      id
      name
      description
      date
      type
      users {
        id
        fullName
        profileURL
        image
      }
      project {
        id
        name
        url
        image
      }
      creator {
        id
        fullName
        profileURL
        image
      }
    }
  }
`;

export type SuccessType = 'EPIC' | 'SMALL' | 'NEWS'

export interface IUser {
  id: string;
  fullName: string;
  profileURL: string;
  image: string;
}

export interface ISuccess {
  id?: string;
  name: string;
  description: string;
  date: Date;
  type: SuccessType;
  users: IUser[];
  project: {
    id: string;
    name: string;
    url: string;
    image: string;
  };
  creator: IUser;
}

interface IData {
  successes: ISuccess[];
}

export interface IWithSuccesses extends IData {
  successesLoading: boolean;
}

export default (WrapperComponent: any) => (props: any) => (
  <Query<IData, {}> query={SUCCESSES}>
    {({ data, loading }) => <WrapperComponent {...props} successes={data.successes} successesLoading={loading} />}
  </Query>
);
