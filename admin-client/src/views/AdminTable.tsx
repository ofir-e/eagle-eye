import { FC, useCallback, useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { CellValueChangedEvent } from "ag-grid-community";
import { ColDef, CsvExportModule, GetContextMenuItems } from "ag-grid-enterprise";
import dayjs from 'dayjs';
import { useDarkMode } from "usehooks-ts";

const commonColumnFields = {
  sortable: true,
  editable: true,
  resizable: true
}
const columnTypes = {
  date: {
    ...commonColumnFields,
    filter: 'agDateColumnFilter',
    comparator: (valueA: string, valueB: string) => dayjs(valueA)?.diff(dayjs(valueB)),
    filterParams: {
      comparator: (filterLocalDateAtMidnight: Date, cellValue: string) => dayjs(cellValue)?.diff(dayjs(filterLocalDateAtMidnight))
    }
  },
  number: {
    ...commonColumnFields,
    filter: 'agNumberColumnFilter',
  },
  string: {
    ...commonColumnFields,
    filter: 'agTextColumnFilter',
  }
};

const typeFromVal = (value: string | number) => {
  if (typeof (value) === 'number') return 'number';
  if (typeof (value) === 'string' && value.length > 0) return dayjs(value).isValid() ? 'date' : 'string';
  return undefined;
}

type IProps = { rows: Record<string, any>[], editCell?: (event: CellValueChangedEvent) => void, reload?: () => void };

export const AdminTable: FC<IProps> = ({ rows, editCell, reload }) => {
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([])
  const { isDarkMode, toggle: toggleDarkMode } = useDarkMode();

  useEffect(() => {
    const colsMapping: Record<string, any> = {};
    for (const row of rows) {
      for (const [col, val] of Object.entries(row)) {
        colsMapping[col] = typeFromVal(val) || colsMapping[col] || 'string'
      }
    }
    setColumnDefs(Object.entries(colsMapping).map(([field, type]) => ({ field, type })));
  }, [rows]);

  const getContextMenuItems: GetContextMenuItems = useCallback(() => {
    return [
      'copy',
      'paste',
      'autoSizeAll',
      'chartRange',
      'csvExport',
      'excelExport',
      {
        name: 'reload',
        action: reload,
        icon: '🔃'
      },
      {
        name: isDarkMode ? 'light mode' : 'dark mode',
        action: toggleDarkMode,
        icon: isDarkMode ? '🌞' : '🌚'
      }
    ];
  }, [isDarkMode]);

  return (
    <div className={`ag-theme-alpine${isDarkMode ? '-dark' : ''}`} style={{ height: '100vh', width: '100vw' }}>
      <AgGridReact
        sortingOrder={[null, 'asc', 'desc']}
        rowData={rows}
        columnDefs={columnDefs}
        columnTypes={columnTypes}
        suppressExcelExport={true}
        getContextMenuItems={getContextMenuItems}
        allowContextMenuWithControlKey={true}
        enableRangeSelection={true}
        modules={[CsvExportModule]}
        onCellValueChanged={editCell}
        enableCharts={true}
      />
    </div>
  );
}

AdminTable.defaultProps = {
  editCell: () => { },
  reload: () => { }
}