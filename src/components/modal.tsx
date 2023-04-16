import { SuccessAnimation } from './animation'

export default function Modal({ setModal }: any) {
  function handleClose() {
    setModal(false)
  }
  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50 z-50"></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 ">
          <SuccessAnimation />
          <p className="mb-4">저장이 완료되었습니다.</p>
          <div className='text-center'>
            <button className=" bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600" onClick={handleClose}>Close</button>
          </div>
        </div>
      </div>
    </>
  )
};
