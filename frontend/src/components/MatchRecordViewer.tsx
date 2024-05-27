import useBoundStore from "../bound-store";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

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
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Game Start Time</TableCell>
            <TableCell align="right">Total Words</TableCell>
            <TableCell align="right">Nailed Words</TableCell>
            <TableCell align="right">Accuracy</TableCell>
            <TableCell align="right">Total Time (s)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {matchRecords.map((matchRecord, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {numberToDate(matchRecord.gameStartTime)}
              </TableCell>
              <TableCell align="right">{matchRecord.totalWords}</TableCell>
              <TableCell align="right">{matchRecord.nailedWords}</TableCell>
              <TableCell align="right">
                {matchRecord.nailedWords === null ||
                matchRecord.totalWords === null
                  ? null
                  : `${Math.round(
                      (matchRecord.nailedWords / matchRecord.totalWords) * 100
                    )}%`}
              </TableCell>
              <TableCell align="right">
                {matchRecord.totalTime &&
                  Math.floor(matchRecord.totalTime / 1000)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
