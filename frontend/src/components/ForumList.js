import React from 'react';

export function ForumList({ forums, onSelectForum }) {
  return (
    <div className="">
      <ul className="">
        {forums.map((forum, index) => (
          <li key={forum.id}>
            <div onClick={() => onSelectForum(index)} className="">
              <div className="">
                <h3 className="">{forum.title || 'Untitled Note'}</h3>
                <p className="">{forum.content || 'No content'}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
