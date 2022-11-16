import React,{Component} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const options =[
  { value:'mexico', label:'Mexico'},
  { value:'canada', label:'Canada'},
]


class App extends Component {
  
  componentDidMount(){
    axios.get('http://localhost:8000/postulante')
    .then(res =>{
      console.log(res.data);
      this.setState({postulante: res.data})
    })
  }


  render() {
    return (  <Container>
      <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Fecha</th>
          <th>Dni</th>
          <th>Pefil</th>
          <th>Nivel</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {this.state.postulante.map( (postulante,index) =>{
          return (
            <tr key={postulante.id}>
              <td>{postulante.id}</td>
              <td>{postulante.name}</td>
              <td>{postulante.release_date}</td>
              <td>{postulante.dni}</td>
              <td>{postulante.perfil}</td>
              <td>{postulante.nivel}</td>
              <td>
              <Button variant="success" onClick={()=>this.mostrar(postulante.id,index)}>Editar</Button>
              <Button variant="danger" onClick={()=>this.eliminar(postulante.id)}>Eliminar</Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
    <hr />
    <h1>{this.state.titulo}</h1>
    <Form onSubmit={this.guardar}>
      <Form.Control type="hidden" value={this.state.id} />

      <Form.Group className="mb-3">
        <Form.Label>Ingrese Nombre:</Form.Label>
        <Form.Control type="text" value={this.state.nombre} onChange={this.cambioNombre} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Dni:</Form.Label>
        <Form.Control type="number" value={this.state.dni} onChange={this.cambioDni} />
      </Form.Group> 

      <Form.Group className="mb-3">
        <Form.Label>Perfil:</Form.Label>
        <Form.Select  onChange={this.cambioPerfil} >
      <option  type="text"  value="frontend"  >frontend</option>
      <option type="text" value="backend"  >backend</option>
      </Form.Select> 
        
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Nivel:</Form.Label>
       <Form.Select  onChange={this.cambioNivel} >
      <option  type="text"  value="junior"  >junior</option>
      <option type="text" value="semisenior"  >semisenior</option>
      <option type="text" value="senior" >senior</option>
      </Form.Select> 
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Fecha:</Form.Label>
        <Form.Control type="date" value={this.state.fecha} onChange={this.cambioFecha} />
      </Form.Group>
      <Button variant="primary" type="submit">
        GUARDAR
      </Button>
  </Form>
</Container>
)
  }

  constructor(props){
    super(props);
    this.state = ({
      postulante:[],
      pos:null,
      titulo:'Nuevo',
      id:0,
      nombre:'',
      fecha:'',
      dni:'0',
      perfil:'',
      nivel:''
    })
    this.cambioNombre = this.cambioNombre.bind(this);
    this.cambioFecha = this.cambioFecha.bind(this);
    this.cambioDni= this.cambioDni.bind(this);
    this.cambioPerfil = this.cambioPerfil.bind(this);
    this.cambioNivel = this.cambioNivel.bind(this);
    this.mostrar = this.mostrar.bind(this);
    this.eliminar = this.eliminar.bind(this);
    this.guardar = this.guardar.bind(this);
  }

cambioNombre(e){
    this.setState({
      nombre: e.target.value
    })
  }

  cambioFecha(e){
    this.setState({
      fecha: e.target.value
    })
  }

  cambioDni(e){
    this.setState({
      dni: e.target.value
    })
  }

  cambioPerfil(e){
    this.setState({
      perfil: e.target.value
    })
  }

  cambioNivel(e){
    this.setState({
      nivel: e.target.value
    })
  }

//Pedimos datos 

  mostrar(cod,index){
    axios.get('http://localhost:8000/postulante/'+cod)
    .then(res => {
      this.setState({
        pos: index,
        titulo: 'Editar',
        id: res.data.id,
        nombre :res.data.name,
        fecha: res.data.release_date,
        dni: res.data.dni,
        perfil : res.data.perfil,
        nivel : res.data.nivel
      })
    })
  }


  
  guardar(e){
    e.preventDefault();
    let cod = this.state.id;
    const datos = {
      name: this.state.nombre,
      release_date: this.state.fecha,
      dni: this.state.dni,
      perfil : this.state.perfil,
      nivel: this.state.nivel
    }
    if(cod>0){
      //edición de un registro
      axios.put('http://localhost:8000/postulante/'+cod,datos)
      .then(res =>{
        let indx = this.state.pos;
        this.state.postulante[indx] = res.data;
        var temp = this.state.postulante;
        this.setState({
          pos:null,
          titulo:'Nuevo',
          id:0,
          nombre:'',
          fecha:'',
          dni:'0',
          perfil:'',
          nivel:'',
          postulante: temp
        });
      }).catch((error) =>{
        console.log(error.toString());
      });
    }else{
      //nuevo registro
      axios.post('http://localhost:8000/postulante',datos)
      .then(res => {
        this.state.postulante.push(res.data);
        var temp = this.state.postulante;
        this.setState({
          id:0,
          nombre:'',
          fecha: '',
          dni:'0',
          perfil:'',
          nivel:'',
          postulante:temp
        });
      }).catch((error)=>{
        console.log(error.toString());
      });
    }
  }


eliminar(cod){
  let rpta = window.confirm("Desea Eliminar?");
  if(rpta){
    axios.delete('http://localhost:8000/postulante/'+cod)
    .then(res =>{
      var temp = this.state.postulante.filter((postulante)=>postulante.id !== cod);
      this.setState({
        postulante: temp
      })
    })
  }
}

}
export default App;
