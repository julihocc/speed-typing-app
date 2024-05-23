import useBoundStore from "../store";
import { Table } from "@radix-ui/themes";

function numberToDate(number: number | null) {
  if (number === null) return null;
  const gameStartDate = new Date(number);
  const formattedDate = gameStartDate.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });
  return formattedDate;
}

export default function MatchRecordViewer() {
  const matchRecords = useBoundStore((state) => state.getMatchRecords());

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.Cell>Game start time</Table.Cell>
          <Table.Cell>Total words</Table.Cell>
          <Table.Cell>Nailed words</Table.Cell>
          <Table.Cell>Accuracy</Table.Cell>
          <Table.Cell>Total time</Table.Cell>
        </Table.Row>
        {matchRecords.map((matchRecord, index) => (
          <Table.Row key={index}>
            <Table.Cell>{numberToDate(matchRecord.gameStartTime)}</Table.Cell>
            <Table.Cell>{matchRecord.totalWords}</Table.Cell>
            <Table.Cell>{matchRecord.nailedWords}</Table.Cell>
            <Table.Cell>
              {(matchRecord.nailedWords === null || matchRecord.totalWords === null)
                ? null
                : `${Math.round(
                    (matchRecord.nailedWords / matchRecord.totalWords) * 100
                  )}%`}
            </Table.Cell>
            <Table.Cell>
              {matchRecord.totalTime &&
                Math.floor(matchRecord.totalTime / 1000)}
              s
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Header>
    </Table.Root>
  );
}
