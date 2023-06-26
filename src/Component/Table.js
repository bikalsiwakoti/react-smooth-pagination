import React, { useState, useEffect } from 'react'
import axios from 'axios'
import "./table.css"

function Table() {
  const [users, setUsers] = useState([])
  const [totalUsers, setTotalUsers] = useState([])
  const [page, setPage] = useState(0)
  const [paginateNum, setPaginateNum] = useState(10)

  const paginationTotalNumber = Math.ceil(totalUsers.length / paginateNum)

  useEffect(() => {
    axios.get(`http://localhost:8000/api/user?page=${page}&paginate=${paginateNum}`).then((res) => {
      setUsers(res?.data)
    }).catch((error) => {
      console.log(error)
    })

    axios.get(`http://localhost:8000/api/users`).then((res) => {
      setTotalUsers(res?.data)
    }).catch((error) => {
      console.log(error)
    })
  }, [page, paginateNum])

  console.log(page)
  return (
    <>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">S.N</th>
            <th scope="col">Actual Name</th>
            <th scope="col">Display Name</th>
            <th scope="col">Name</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, i) => {
            return (
              <tr key={i}>
                <th scope="row">{(i + 1) + (page * paginateNum)}</th>
                <td>{user.actualName}</td>
                <td>{user.displayName}</td>
                <td>{user.name}</td>
              </tr>
            )
          })
          }
        </tbody>
      </table>

      {/* pagination   */}
      <div className='paginateSelect'>
        <nav aria-label="...">
          <ul class="pagination w-100">
            <li class={page <= 0 ? "page-item disabled" : "page-item "}>
              <span class="page-link" onClick={() => {
                if (page <= 0) {
                  setPage((prev) => prev)
                } else {
                  setPage((prev) => prev - 1)
                }
              }} style={{ cursor: "pointer" }}>Previous</span>
            </li>
            {Array.from(Array(paginationTotalNumber), (data, i) => {
              return (
                <>
                  <li class={page === i ? "page-item active" : "page-item"}><span class="page-link" style={{ cursor: "pointer" }} onClick={(e) => setPage(Number(i))}>{i + 1}</span></li>
                </>
              )
            })

            }
            <li class={paginationTotalNumber <= page + 1 ? "page-item disabled" : "page-item "}>
              <span class="page-link" onClick={() => {
                if (paginationTotalNumber <= page + 1) {
                  setPage((prev) => prev)
                } else {
                  setPage((prev) => prev + 1)
                }
              }} style={{ cursor: "pointer" }}>Next</span>
            </li>
          </ul>
        </nav>

        <select class="form-select w-25" aria-label="Default select example" onChange={(e) => {
          setPaginateNum(Number(e.target.value))
          setPage(0)
        }}>
          <option value="10" selected>Select Paginated number</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="100">100</option>
          <option value="200">200</option>
        </select>
      </div>

    </>
  )
}

export default Table