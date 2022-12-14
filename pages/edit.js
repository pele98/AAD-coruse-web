import React from 'react';
import { useMutation, useQuery } from '@apollo/client';

import NoteForm from '../components/NoteForm';
import { GET_NOTE, GET_ME } from '../gql/query';
import { EDIT_NOTE } from '../gql/mutation';
import { useNavigate, useParams } from 'react-router-dom';

const EditNote = () => {

  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });
  const { data: userdata } = useQuery(GET_ME);
  const [editNote] = useMutation(EDIT_NOTE, {
    variables: {
      id
    },
    onCompleted: () => {
      navigate(`../note/${id}`);
    }
  });

  if (loading) return 'Loading...';
  if (error) return <p>Error!</p>;
  if (userdata.me.id !== data.note.author.id) {
    return <p>You do not have access to edit this note</p>;
  }

  return <NoteForm content={data.note.content} action={editNote} />;
};

export default EditNote;
