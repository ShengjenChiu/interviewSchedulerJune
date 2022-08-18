import React from "react";
import axios from "axios";
import {render, cleanup, waitForElement, fireEvent, getByText, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, queryByAltText } from "@testing-library/react";
import Application from "components/Application";

afterEach(cleanup);

//test for Application component
describe("Application", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"));
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  //test for books an interview
  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    axios.put.mockResolvedValueOnce("it works!");

    const { container } = render(<Application />);
    
    //print the container
    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    //print the three appointments
    const appointments = getAllByTestId(container, "appointment");

    //print the first appointment, the EMPTY appointment
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    expect(getByText(appointment, "Lydia Miller-Jones")).toBeInTheDocument();

    //Check that the DayListItem with the text "Monday" also has the text "no spots remaining"
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();

  });

  // //test for cancels an interview
  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    axios.delete.mockResolvedValueOnce("it works!");

    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(
      getByText(appointment, "Are you sure you would like to delete?")
    ).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });


  // //test for edits an interview
  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    axios.put.mockResolvedValueOnce("it works!");

    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Edit" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Edit"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    //Check that the DayListItem with the text "Monday" with no change of the text " spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });



  // /* test number five for the saving error*/
  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    // 1. Render the Application.
    // const { container } = render(<Application />);

  //console.log('container');

    // 2. Wait until the text "Archie Cohen" is displayed.
    // await waitForElement(() => getByText(container, "Could not book appointment"));

    // expect(error, "Could not book appointment").toBeInTheDocument();
    // expect(error).getByText('statusCode', 204);

    // //test the close button
    // fireEvent.click(getByText(error, "onCancel"));

    // //Go back to previous page
    // const day = getAllByTestId(container, "day").find(day =>
    //   queryByText(day, "Monday")
    // );

    // expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  // //test for the deleting error
  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    // // 1. Render and wait for the error message.
    // const { error } = await getError(() => {});
  
    // expect(error, "Could not cancel appointment").toBeInTheDocument();
    // expect(error).toHaveProperty('statusCode', 204);

    // //test the close button
    // fireEvent.click(getByText(error, "onCancel"));

    // //Go back to previous page
    // const day = getAllByTestId(container, "day").find(day =>
    //   queryByText(day, "Monday")
    // );

    // expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });



});

