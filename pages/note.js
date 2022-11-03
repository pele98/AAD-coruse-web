import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from "react-router-dom";

import Note from '../components/Note';

const GET_NOTE = gql`
  query note($id: ID!) {
    note(id: $id) {
      id
      createdAt
      content
      favoriteCount
      author {
        username
        id
        avatar
      }
    }
  }
`;

const NotePage = props => {
  const params = useParams();
  if(!params.id) return <p>Error! ID not provided</p>;
  const id = params.id;
  const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! Note not found</p>;

  return <Note note={data.note} />;
};

export default NotePage;