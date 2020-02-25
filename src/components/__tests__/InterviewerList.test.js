import React from "react";

import { render } from "@testing-library/react";

import InterviewerList from "components/InterviewerList";

it("renders without crashing", () => {
  const interviewers = [];
  const value = 3;
  const onChange = function() {};
  render(<InterviewerList interviewers={interviewers} value={value} onChange={onChange}/>);
});