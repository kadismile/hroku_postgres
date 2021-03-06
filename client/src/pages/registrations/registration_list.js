import React, {useEffect, useState} from "react";
import {getRegistrations, removeRegistration} from "../../utils/auth-client";
import Swal from "sweetalert2";
import {Redirect} from "react-router";
import {ProductCsvUpload} from "../../components/modals/product_csv_upload";
import {InviteUser} from "./user_invite_modal";

function RegistrationList() {

  const [users, setUsers] = useState([]);

  const [productToEdit, setProductToEdit] = useState(false)

  const [productId, setProductId] = useState("")

  const [regId, setRegId] = useState("")

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    (async function(){
      const data = await getRegistrations()
      setUsers(data)
      const table = document.getElementById('datatable-buttons');
      if (table) {
        window.$('#datatable-buttons').DataTable({
          "lengthMenu": [[20, 50, 100, -1], [20, 50, 100, "All"]],
        });
        window.$('input[type=search]').addClass('form-control');
      }
    })()
  }, [showModal, regId])

  const editProduct = (id) => {
    setProductToEdit(true)
    setProductId(id)
  }

  const deleteProduct = async (reg) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You will not be able to recover this user ${reg.name}!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then( async (result) => {
      if (result.value) {
        const result = await removeRegistration(reg)
        setRegId(Math.random() * 2)
        console.log(result)
      }
    })
  }

  const displayModal = (value) => {
    setShowModal(value)
  };


  return (
    !productToEdit ?
      <>
        <div className="main-content">
          <div className="page-content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="page-title-box d-flex align-items-center justify-content-between">
                    <h4 className="mb-0 font-size-18">Registrations</h4>
                 {/*   <div className="page-title-right">
                      <div className="btn-group" role="group" style={{marginRight: "80px"}}>
                        <button id="btnGroupDrop1" type="button" className="btn btn-outline-secondary dropdown-toggle"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          Action <i className="mdi mdi-chevron-down"></i>
                        </button>
                        <div className="dropdown-menu" aria-labelledby="btnGroupDrop1" x-placement="bottom-start"
                             style={{position: "absolute", willChange: "transform", top: "0px", left: "-70px", transform: "translate3d(0px, 36px, 0px)"}}>

                          <a href="#" onClick={e => { setShowModal(true) }} className="dropdown-item">
                            Invite a User
                          </a>

                        </div>
                      </div>
                    </div>*/}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table mb-0">
                          <thead className="thead-light">
                          <tr role="row">
                            <th className="sorting_asc" tabIndex={0} aria-controls="datatable-buttons" rowSpan={1}
                                colSpan={1} style={{width: '274px'}} aria-sort="ascending"
                                aria-label="Name: activate to sort column descending">#
                            </th>
                            <th className="sorting_asc" tabIndex={0} aria-controls="datatable-buttons" rowSpan={1}
                                colSpan={1} style={{width: '274px'}} aria-sort="ascending"
                                aria-label="Name: activate to sort column descending">Name
                            </th>
                            <th className="sorting_asc" tabIndex={0} aria-controls="datatable-buttons" rowSpan={1}
                                colSpan={1} style={{width: '274px'}} aria-sort="ascending"
                                aria-label="Name: activate to sort column descending">Ward
                            </th>
                            <th className="sorting_asc" tabIndex={0} aria-controls="datatable-buttons" rowSpan={1}
                                colSpan={1} style={{width: '274px'}} aria-sort="ascending"
                                aria-label="Name: activate to sort column descending">Phone Number
                            </th>
                            <th className="sorting" tabIndex={0} aria-controls="datatable-buttons" rowSpan={1}
                                colSpan={1} style={{width: '397px'}}
                                aria-label="Position: activate to sort column ascending">State
                            </th>
                            <th className="sorting" tabIndex={0} aria-controls="datatable-buttons" rowSpan={1}
                                colSpan={1} style={{width: '397px'}}
                                aria-label="Position: activate to sort column ascending">Email
                            </th>
                            <th className="sorting" tabIndex={0} aria-controls="datatable-buttons" rowSpan={1}
                                colSpan={1} style={{width: '202px'}}
                                aria-label="Office: activate to sort column ascending">Age
                            </th>
                            <th className="sorting_asc" tabIndex={0} aria-controls="datatable-buttons" rowSpan={1} colSpan={1} style={{width: '10px'}}>
                            </th>
                            <th className="sorting_asc" tabIndex={0} aria-controls="datatable-buttons" rowSpan={1} colSpan={1} style={{width: '10px'}}>
                            </th>

                          </tr>
                          </thead>
                          <tbody>
                          {users.map((user, index)=> {
                            return (
                              <tr key={index}>
                                <th scope="row">{index+1}</th>
                                <td>{user.name}</td>
                                <td>{user.ward}</td>
                                <td>{user.phone_number}</td>
                                <td>{user.state}</td>
                                <td>{user.email}</td>
                                <td>{user.age}</td>
                                <td>
                                  {/*<a onClick={() => editProduct(user._id)} style={{color: "#767c82", cursor: "pointer"}}>
                                    <i className="fa fa-fw fa-edit" data-toggle="tooltip" data-placement="top" title=""data-original-title="edit"></i>
                                  </a>*/}
                                </td>
                                <td>
                                  <a onClick={()=> deleteProduct(user)} style={{color: "#767c82", cursor: "pointer"}}>
                                    <i className="fa fa-fw fa-trash" data-toggle="tooltip" data-placement="top" title=""data-original-title="remove"></i>
                                  </a>
                                </td>
                              </tr>
                            )
                          })}

                          </tbody>
                        </table>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        {showModal ? <InviteUser toggleModal={displayModal}/> : ""}
      </>
      :
      <Redirect to={"/product/edit/"+productId} state={"productId"}/>

  )
}

export {RegistrationList}