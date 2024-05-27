import useBoundStore from "../stores/bound-store";

const Debug = () => {
  const captured = useBoundStore((state) => state.captured);
  // console.log(`captured: ${captured}`);
  // const setCaptured = useBoundStore((state) => state.setCaptured);

  return (
    <div>
      <h1>Debug</h1>
      <pre>{JSON.stringify(captured, null, 2)}</pre>
    </div>
  );
};

export default Debug;
