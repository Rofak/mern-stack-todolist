import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faTrash,
  faPenToSquare,
  faFloppyDisk,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
library.add(faTrash, faPenToSquare, faFloppyDisk);
export function TodoList(props: any) {
  const BASE_URL = 'http://localhost:3000/api';
  const [isEdit, setIsEdit] = useState<any>(false);
  const [completed, setCompleted] = useState(false);
  const [title, setTitle] = useState('');
  useEffect(() => {
    setCompleted(props.completed);
    setTitle(props.title);
  }, [props.completed, props.title]);
  const onDelete = () => {
    props.onDelete(props.id);
  };

  const handleCheckbox = () => {
    setCompleted(!completed);
    props.onCompleted(props.id, !completed);
    axios.put(`${BASE_URL}/todo/${props.id}`, { title, completed: !completed });
  };

  const handleChange = (e: any) => {
    setTitle(e.target.value);
  };

  const handleEdit = () => {
    setIsEdit(true);
  };
  const handleSaveEdit = () => {
    setIsEdit(false);
    axios.put(`${BASE_URL}/todo/${props.id}`, { title, completed });
  };
  const list = () => {
    if (isEdit) {
      return (
        <input
          type="text"
          placeholder="Type here"
          className="input ml-3 h-fit"
          value={title}
          onChange={handleChange}
        />
      );
    }
    return (
      <div className={`ml-3 ${completed ? 'line-through' : ''}`}>{title}</div>
    );
  };
  return (
    <>
      <div className="mt-2 bg-blue-200 p-2 flex justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={completed}
            className="checkbox"
            disabled={isEdit}
            onChange={handleCheckbox}
          />
          {list()}
        </div>
        <div>
          {isEdit ? (
            <FontAwesomeIcon
              icon={faFloppyDisk}
              className="mr-3 hover:cursor-pointer"
              onClick={handleSaveEdit}
            />
          ) : (
            <FontAwesomeIcon
              icon={faPenToSquare}
              className="mr-3 hover:cursor-pointer"
              onClick={handleEdit}
            />
          )}

          <FontAwesomeIcon
            className="mr-3 hover:cursor-pointer"
            onClick={onDelete}
            icon={faTrash}
          />
        </div>
      </div>
    </>
  );
}
