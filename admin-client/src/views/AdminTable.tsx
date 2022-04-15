import { FC, useCallback, useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { CellValueChangedEvent } from "ag-grid-community";
import { CsvExportModule, GetContextMenuItems } from "ag-grid-enterprise";
import dayjs from 'dayjs';
import { useDarkMode } from "usehooks-ts";
import axios from "axios";
import './AdminTable.css';

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
const defaultColumns = [
  { field: 'personalId', headerName: 'מ"א', type: 'string' },
  { field: 'fullName', headerName: "שם מלא", type: 'string' }
];

type IProps = { formMetadata: IFormMetadata, rows: Record<string, any>[], editCell?: (event: CellValueChangedEvent) => void, reload?: () => void };

export const AdminTable: FC<IProps> = ({ formMetadata, rows, reload, editCell }) => {
  const { isDarkMode, toggle: toggleDarkMode } = useDarkMode();

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
        columnDefs={[...defaultColumns, ...formMetadata.fields.map(({ name: field, fieldType: type, label: headerName }) => ({ field, type, headerName }))]}
        columnTypes={columnTypes}
        suppressExcelExport={true}
        getContextMenuItems={getContextMenuItems}
        allowContextMenuWithControlKey={true}
        enableRangeSelection={true}
        modules={[CsvExportModule]}
        enableCharts={true}
        onCellValueChanged={editCell}
      />
    </div>
  );
}

AdminTable.defaultProps = {
  editCell: () => { },
  reload: () => { }
}

type IFormField = { name: string, label: string, fieldType: 'number' | 'date' | 'string' }
type IFormMetadata = {
  formType: string,
  fields: IFormField[]
}

export const AdminTableContainer: FC = () => {

  const [formsMetadata, setFormsMetadata] = useState<IFormMetadata[]>([])
  const [selectedForm, setSelectedForm] = useState<IFormMetadata>()
  useEffect(() => {
    axios.get<IFormMetadata[]>('http://localhost:3001/formsMetadata')
      .then(({ data }) => {
        setFormsMetadata(data);
      });
  }, [])



  const [rows, setRows] = useState<Record<string, any>[]>([]);

  const reload = useCallback(() => {
    axios.get<Record<string, any>[]>(`http://localhost:3001/forms?formType=${selectedForm?.formType}`)
      .then(({ data }) => { setRows(data) })
      .catch(() => { alert("התרחשה שגיאה!") });
  }, [selectedForm])

  useEffect(() => {
    if (selectedForm) reload();
  }, [selectedForm])

  const editCell = useCallback((event: CellValueChangedEvent) => {
    const { _id } = event.data;
    axios.patch<Record<string, any>[]>(`http://localhost:3001/forms/${_id}`, { [event.colDef.field!]: event.newValue })
      .then(() => { reload(); })
      .catch(() => { alert("התרחשה שגיאה!") });
  }, [])

  return <>
    <div className={`form-type-selector ${selectedForm ? 'grow' : ''}`}>
      <select onChange={e => {
        setSelectedForm(formsMetadata.find(({ formType }) => e.target.value === formType));
      }}>
        <option hidden>סוג טופס</option>
        {formsMetadata.map((metadata) => (
          <option
            style={{ textAlign: 'right' }}
            key={metadata.formType}
            onSelect={() => { setSelectedForm(metadata) }}
          >
            {metadata.formType}
          </option>
        ))}
      </select>
    </div>
    {selectedForm && <AdminTable formMetadata={selectedForm} rows={rows} reload={reload} editCell={editCell} />}
  </>
}