import React from "react";

import axios from "axios";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  waitForElementToBeRemoved,
  queryByText,
  queryByAltText,
  getByDisplayValue
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", async() => {
    const { getByText } = render(<Application />);
    
    await waitForElement(() => getByText("Monday"));
    
    fireEvent.click(getByText("Tuesday"));
    
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
  
  it("loads data, books an interview and redduces the spots remaining for the first day by 1", async() => {
    const { container } = render(<Application />);
    
    //wait for API call
    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    //drill down to first appointment element
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    
    //Add an appointment and change the input of name
    //Select an interviewer and save the appointment
    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), { target: { value: "Lydia Miller-Jones" } });
    fireEvent.click(getByAltText(appointment, "Tori Malcolm"));
    fireEvent.click(getByText(appointment, "Save"));
    
    //Check if at saving status
    expect(getByText(appointment, /saving/i)).toBeInTheDocument();
    
    //wait for saving to complete
    await waitForElementToBeRemoved(() => getByText(appointment, /saving/i));
    
    //Check if student name is now on the appointment
    expect(getByText(appointment, "Lydia Miller-Jones")).toBeInTheDocument();
    
    //get the Monday node
    const day = getAllByTestId(container, "day").find((day) => queryByText(day, "Monday"));
    
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
    
  });
  
  it("loads data, cancels an interview and increase the spots remaining for Monday by 1", async() => {
    //render app
    const { container } = render(<Application />);
    
    //wait until data loads
    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    //find appointment we want to cancel
    const appointment = getAllByTestId(container, "appointment")
      .find(appointment => queryByText(appointment, "Archie Cohen")
      );

    //click Delete
    fireEvent.click(queryByAltText(appointment, "Delete"));

    //check that confirmation message is shown
    expect(getByText(container, "Are you sure you want to delete?")).toBeInTheDocument();
    
    //click confirm
    fireEvent.click(queryByText(appointment, "Confirm"));
    
    //check for "deleting"
    expect(getByText(appointment, "Deleting...")).toBeInTheDocument();
    
    //wait for appointment spot to load
    await waitForElement(() => getByAltText(appointment, "Add"));
    
    //get the Monday node
    const day = getAllByTestId(container, "day").find((day) => queryByText(day, "Monday"));
    
    //check daylist item for Monday has 2 spots.
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async() => {
    //render app
    const { container } = render(<Application />);

    //wait until data loads
    await waitForElement(() => getByText(container, "Archie Cohen"));

    //find appointment we want to cancel
    const appointment = getAllByTestId(container, "appointment")
      .find(appointment => queryByText(appointment, "Archie Cohen")
      );

    //click edit
    fireEvent.click(queryByAltText(appointment, "Edit"));

    //change name & click save
    fireEvent.change(getByDisplayValue(appointment, "Archie Cohen"), { target: { value: "Django McGee" } });
    fireEvent.click(getByText(appointment, "Save"));

    //check for editing
    expect(getByText(appointment, "Saving...")).toBeInTheDocument();

    //wait for editing to go away
    await waitForElementToBeRemoved(() => getByText(appointment, /saving/i));

    //check appoitnment is now Django
    expect(getByText(appointment, "Django McGee")).toBeInTheDocument();

    //get the Monday node
    const day = getAllByTestId(container, "day").find((day) => queryByText(day, "Monday"));

    //confirm monday spots is 1
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", async() => {
    axios.put.mockRejectedValueOnce();
    const { container } = render(<Application />);
    
    //wait for API call
    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    //drill down to first appointment element
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    
    //Add an appointment and change the input of name
    //Select an interviewer and save the appointment
    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), { target: { value: "Lydia Miller-Jones" } });
    fireEvent.click(getByAltText(appointment, "Tori Malcolm"));
    fireEvent.click(getByText(appointment, "Save"));
    
    //Check if at saving status
    expect(queryByText(appointment, "Saving...")).toBeInTheDocument();

    //wait for saving to complete
    await waitForElementToBeRemoved(() => getByText(appointment, "Saving..."));

    //Check if at error status
    expect(queryByText(appointment, "Error saving.")).toBeInTheDocument();
  });

  it("shows the delete error when failing to delete an existing appointment", async() => {
    axios.delete.mockRejectedValueOnce();
    //render app
    const { container } = render(<Application />);
    
    //wait until data loads
    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    //find appointment we want to cancel
    const appointment = getAllByTestId(container, "appointment")
      .find(appointment => queryByText(appointment, "Archie Cohen")
      );

    //click Delete
    fireEvent.click(queryByAltText(appointment, "Delete"));

    //check that confirmation message is shown
    expect(getByText(container, "Are you sure you want to delete?")).toBeInTheDocument();
    
    //click confirm
    fireEvent.click(queryByText(appointment, "Confirm"));
    
    //check for "deleting"
    expect(getByText(appointment, "Deleting...")).toBeInTheDocument();

    //wait for deleting to complete
    await waitForElementToBeRemoved(() => getByText(appointment, "Deleting..."));

    //Check if at error status
    expect(queryByText(appointment, "Error deleting.")).toBeInTheDocument();
  });
  
});
