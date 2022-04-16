import axios from "axios";
import { FC, Fragment, useEffect, useState } from "react"
import { useForm } from 'react-hook-form';
import { useLocalStorage } from "usehooks-ts";

type IFormField = { name: string, label: string, fieldType: 'number' | 'date' | 'string' }
type IFormMetadata = {
  formType: string,
  fields: IFormField[]
}

export const FormContainer: FC = () => {
  const [formsMetadata, setFormsMetadata] = useState<IFormMetadata[]>([])
  const [selectedForm, setSelectedForm] = useState<IFormMetadata>()
  useEffect(() => {
    axios.get<IFormMetadata[]>('http://localhost:7500/formsMetadata')
      .then(({ data }) => {
        setFormsMetadata(data);
      });
  }, [])
  return <>
    <div>
      <select style={{ textAlign: 'right', maxWidth: '400px', margin: 'auto' }} onChange={e => {
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
    {selectedForm && <Form metadata={selectedForm} onSubmit={(formData) => {
      axios.post<IFormMetadata[]>('http://localhost:7500/forms', { ...formData, formType: selectedForm.formType })
        .then(({ data }) => {
          alert('נשמר בהצלחה')
        })
        .catch(e => {
          alert('תקלה בשמירה נסה שוב')

        });

    }} />}
  </>
}

const fieldTypeMapping = {
  string: 'text', number: 'number', date: 'date'
}
export const Form: FC<{ metadata: IFormMetadata, onSubmit?: (obj: any) => void }> = ({ metadata, onSubmit }) => {
  const { register, handleSubmit } = useForm();

  const [fullName, setFullName] = useLocalStorage('fullName', '');
  const [personalId, setPersonalId] = useLocalStorage('personalId', '');

  return <>
    <form onSubmit={handleSubmit(onSubmit!)}>
      <Fragment key='fullName'>
        <label style={{ textAlign: 'right' }}>שם מלא</label>
        <input value={fullName} required style={{ textAlign: 'right' }} type='text' {...register('fullName', { onChange: (e) => { setFullName(e.target.value) } })} />
      </Fragment>
      <Fragment key='personalId'>
        <label style={{ textAlign: 'right' }}>מספר אישי</label>
        <input value={personalId} required style={{ textAlign: 'right' }} type='text' {...register('personalId', { onChange: (e) => { setPersonalId(e.target.value) } })} />
      </Fragment>
      {metadata.fields.map(({ name, label, fieldType }) => (
        <Fragment key={name}>
          <label style={{ textAlign: 'right' }}>{label}</label>
          <input required style={{ textAlign: 'right' }} type={fieldTypeMapping[fieldType]} {...register(name, { valueAsNumber: fieldType === 'number' })} />
        </Fragment>
      ))}
      <button type='submit'>הגש טופס</button>
    </form>
  </>
}
Form.defaultProps = {
  onSubmit: (obj) => { alert(JSON.stringify(obj)) }
}