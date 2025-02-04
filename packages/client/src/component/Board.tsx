import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useInstructionResults } from "../hooks/useInstructionResults";

const BOARD_HEIGHT = 500;
const BOARD_WIDTH = 500;

const BOARD_ITEM_HEIGHT = 50;
const BOARD_ITEM_WIDTH = 50;

const ITEM_ROWS = BOARD_WIDTH / BOARD_ITEM_WIDTH;
const ITEM_COLUMNS = BOARD_HEIGHT / BOARD_ITEM_HEIGHT;

const createArray = (num: number) => Array.from({ length: num }).map((_, i) => i);

const Board = () => {
  const { data, isLoading } = useInstructionResults();
  const [billboardId, setBillboardId] = useState("");
  const [showBillboardDetails, setShowBillboardDetails] = useState(false);

  const { data: billboardData, isLoading: isLoadingBillboardData } = useQuery({
    queryKey: ["billboard/get", { id: billboardId }],
    queryFn: () => fetch(`http://localhost:4001/get-billboard?id=${billboardId}`).then((r) => r.json()),
    enabled: !!billboardId,
  });

  const [dronePosition, setDronePosition] = useState<number[]>([BOARD_HEIGHT / 100, BOARD_WIDTH / 100]);
  const billboardMapRef = useRef(new Map<string, Array<number>>());

  const rows = useMemo(() => createArray(ITEM_ROWS), []);
  const columns = useMemo(() => createArray(ITEM_COLUMNS), []);

  useEffect(() => {
    if (!isLoading && data) {
      let lastCoordinate = dronePosition;
      const billboards = data.billboards as Array<Record<string, any>>;
      for (const billboard of billboards) {
        const coordRelativeToDrone = [dronePosition[0] - billboard.x, dronePosition[1] + billboard.y] as number[];
        lastCoordinate = coordRelativeToDrone;
        billboardMapRef.current.set(billboard.id, coordRelativeToDrone);
      }
      setDronePosition(lastCoordinate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, data]);

  const isBillboardCoordinate = useCallback(
    (r: number, c: number) =>
      [...billboardMapRef.current.entries()].find(([, coord]) => coord[0] === r && coord[1] === c)?.[0] ?? null,
    []
  );

  return (
    <>
      <p>Click on the cell with 📷 to view billboard details</p>
      <dialog
        open={showBillboardDetails}
        style={{
          zIndex: 9999,
          width: "60vw",
          display: showBillboardDetails ? "flex" : "none",
          flexDirection: "column",
        }}
      >
        <button style={{ marginLeft: "auto" }} onClick={() => setShowBillboardDetails(false)}>
          X
        </button>
        {isLoadingBillboardData && <p>Loading...</p>}
        {!isLoadingBillboardData && billboardData && (
          <div style={{ display: "table" }}>
            <div style={{ display: "table-row" }}>
              <div style={{ display: "table-cell" }}>Advertiser</div>
              <div style={{ display: "table-cell" }}>{billboardData.billboard.advertiser}</div>
            </div>
            <div style={{ display: "table-row" }}>
              <div style={{ display: "table-cell" }}>Address</div>
              <div style={{ display: "table-cell" }}>{billboardData.billboard.address}</div>
            </div>
            <div style={{ display: "table-row" }}>
              <div style={{ display: "table-cell" }}>Billboard Text</div>
              <div style={{ display: "table-cell" }}>{billboardData.billboard.billboardText}</div>
            </div>
            <div style={{ display: "table-row" }}>
              <div style={{ display: "table-cell" }}>Image</div>
              <div style={{ display: "table-cell" }}>
                <img src={billboardData.billboard.image} height={50} width={50} />
              </div>
            </div>
          </div>
        )}
      </dialog>
      <div
        style={{
          margin: "auto",
          border: "1px solid black",
          position: "relative",
          height: BOARD_HEIGHT,
          width: BOARD_WIDTH,
          display: "table",
          borderCollapse: "separate",
          borderSpacing: 5,
        }}
      >
        {isLoading && <p>Loading...</p>}
        {rows.map((r) => (
          <div key={r} style={{ display: "table-row", height: BOARD_ITEM_HEIGHT }}>
            {columns.map((c) => {
              const id = isBillboardCoordinate(r, c);
              return (
                <div
                  key={c}
                  style={{
                    display: "table-cell",
                    width: BOARD_ITEM_WIDTH,
                    border: `1px dashed ${id ? "red" : "gray"}`,
                    textAlign: "center",
                    verticalAlign: "middle",
                    cursor: id ? "pointer" : "default",
                  }}
                  onClick={() => {
                    if (id) {
                      setShowBillboardDetails(true);
                      setBillboardId(id);
                    }
                  }}
                >
                  {c === dronePosition[1] && r === dronePosition[0] && "🚁"}
                  {id && "📷"}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
};

export default Board;
