import React, { useState, useEffect } from 'react';

export function Forum({ defaultForum = {}, onSaveForum, onDeleteForum }) {
  const [forum, setForum] = useState(defaultForum);

  useEffect(() => {
    if (defaultForum.id) {
      setForum(defaultForum);
    }
  }, [defaultForum]);

  return (
    <div className="">
      <input
        id="title"
        className=""
        placeholder="Untitled Forum"
        value={forum.title}
        onChange={(e) => setForum({ ...forum, title: e.target.value })}
        onBlur={() => onSaveForum(forum)}
      />
      <input
        id="content"
        className=""
        placeholder="No content"
        value={forum.content}
        onChange={(e) => setForum({ ...forum, content: e.target.value })}
        onBlur={() => onSaveForum(forum)}
      />
      <input
        id="project_name"
        placeholder="No content"
        value={forum.poject_name}
        onChange={(e) => setForum({ ...forum, project_name: e.target.value })}
        onBlur={() => onSaveForum(forum)}
      />
      <input
        id="created_at"
        placeholder="No content"
        value={forum.created_at}
        onChange={(e) => setForum({ ...forum, created_at: e.target.value })}
        onBlur={() => onSaveForum(forum)}
      />
      <input
        id="category"
        placeholder="No content"
        value={forum.category}
        onChange={(e) => setForum({ ...forum, category: e.target.value })}
        onBlur={() => onSaveForum(forum)}
      />
      <div className="">
        <a
          onClick={(e) => {
            e.preventDefault();
            onDeleteForum(forum.id);
          }}
        >
          Borrar
          <button className="" />
        </a>
      </div>
    </div>
  );
}
