const NewRooms = () => {
  return (
      <div className='w-1/3'>
          <label htmlFor='name'>Name:</label>
          <input type='text' id='name' className='border-2 border-black mb-2' />
          <label htmlFor='number'>№ Students:</label>
          <input type='number' id='number' className='border-2 border-black' /><br /><br />
          <button className="bg-green-800 p-2 text-white ml-3 rounded-lg">Create</button>
      </div>
  );
}

export default NewRooms
