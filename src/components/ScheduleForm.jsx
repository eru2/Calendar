import React from 'react';

function ScheduleForm({ input, onChange, onAdd }) {
  return (
    <div style={{ marginTop: '10px' }}>
      <input
        type="text"
        value={input}
        onChange={onChange}
        placeholder="일정 입력"
      />
      <button onClick={onAdd}>추가</button>
    </div>
  );
}

export default ScheduleForm;
