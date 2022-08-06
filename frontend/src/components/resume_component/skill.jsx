import React from 'react';
import './skill.css';

function Skill(props) {
  const { skill } = props;

  return (
    <div className="skill_wrap">
      {!!skill.length &&
        skill.map((item, index) => (
          <div className="skill_item" key={index}>
            <p className="skill_name">
              {index + 1}. {item.skill}
            </p>
          </div>
        ))}
    </div>
  );
}

export default Skill;
