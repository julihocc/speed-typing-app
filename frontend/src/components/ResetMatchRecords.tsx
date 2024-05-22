import useBoundStore from '../store'

export default function ResetMatchRecords() {
  const resetMatchRecords = useBoundStore((state) => state.resetMatchRecords)

  return (
    <button onClick={resetMatchRecords}>Reset match records</button>
  )
}