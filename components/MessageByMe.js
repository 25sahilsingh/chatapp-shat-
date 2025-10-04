import React from "react";

const MessageByMe = (props) => {
  return (
    <>
      <div
        className={`border-solid rounded-br-lg rounded-tl-lg w-fit m-2 pr-6 pl-1 py-1 ${
          props.messageinfo[1] === props.messageinfo[2]
            ? "self-end bg-red-800"
            : "self-start bg-blue-800"
        }`}
      >
        <p className="text-yellow-400 text-xs">{`${
          props.messageinfo[1] === props.messageinfo[2]
            ? "me:"
            : props.messageinfo[3] + ":"
        }`}</p>
        <p>
          {`
        ${props.messageinfo[4]}`}
        </p>
      </div>
    </>
  );
};

export default MessageByMe;
