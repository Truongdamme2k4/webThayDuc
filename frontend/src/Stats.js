import { Navigate } from "react-router-dom";
import Count from "./Count";

export default function Stats() {

  return (
    <>
      <div style={{ padding: 20 }}>
        <h2>Stats View</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
        <Count />
      </div>
    </>
  );
}
