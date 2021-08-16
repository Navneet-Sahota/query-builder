import React, { useState } from "react";
import { ReactComponent as CrossIcon } from "../assets/CrossIcon.svg";
import { useCopyToClipBoard } from "../hooks/useCopyToClipboard";

const DEFAULT_TITLE = "Create tag and query";
const DEFAULT_SUBTITLE =
  "The query you build will be saved in your active view";
const QUERY_TITLE = "Build your query";
const QUERY_LABEL = "Query: ";
const MORE_BUTTON_TEXT = "more...";
const LESS_BUTTON_TEXT = "less";
const COPIED_LABEL = "Copied";
const ELLIPSIS_CLASSES = "whitespace-nowrap overflow-hidden overflow-ellipsis";

const Header = ({ queryString = "", onClose = () => {} }) => {
  return (
    <div className="py-6 pl-8 pr-4" style={{ backgroundColor: "#5C61F0" }}>
      <HeaderTitle queryString={queryString} onClose={onClose} />
      <HeaderSubtitle queryString={queryString} />
    </div>
  );
};

const HeaderTitle = ({ queryString, onClose }) => {
  return (
    <>
      <div className="flex text-lg justify-between pb-1">
        {queryString ? QUERY_TITLE : DEFAULT_TITLE}
        <span
          className="flex bg-indigo-700 p-1.5 my-0.5 rounded-md"
          onClick={onClose}
        >
          <CrossIcon
            className="self-center"
            style={{ width: "12px", height: "12px" }}
          />
        </span>
      </div>
    </>
  );
};

const HeaderSubtitle = ({ queryString }) => {
  const { isCopied, setIsCopied, CopyToClipboard } = useCopyToClipBoard();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {queryString ? (
        <div className="flex">
          <div
            className={`p-2 text-sm rounded w-4/5 ${
              isExpanded ? "" : ELLIPSIS_CLASSES
            }`}
            style={{ backgroundColor: "#4338CA" }}
          >
            <strong>{QUERY_LABEL}</strong>
            <CopyToClipboard
              text={queryString}
              onCopy={() => setIsCopied(true)}
            >
              <span>{queryString}</span>
            </CopyToClipboard>
          </div>
          <div
            className="my-1 pl-4 text-lg justify-between cursor-pointer	"
            onClick={() => setIsExpanded((prevValue) => !prevValue)}
          >
            {isExpanded ? LESS_BUTTON_TEXT : MORE_BUTTON_TEXT}
          </div>
          {isCopied ? (
            <span className="bg-gray-200 rounded-md p-1.5 absolute text-gray-600 top-3 left-1/2 transform	-translate-x-1/2">
              {COPIED_LABEL}
            </span>
          ) : null}
        </div>
      ) : (
        <div className="text-indigo-300 text-sm">{DEFAULT_SUBTITLE}</div>
      )}
    </>
  );
};

export default Header;
