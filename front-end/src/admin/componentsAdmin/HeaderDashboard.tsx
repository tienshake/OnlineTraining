import { Box, Grid } from '@mui/material'
import { AiFillBell } from 'react-icons/ai'
import { BsFillInfoSquareFill } from 'react-icons/bs'

export default function HeaderDashboard() {
  return (
    <div style={{ width: '99%' }}>
      <Box mb={7} sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4} md={4} xl={4}>
            <div>
              {/* <p>s</p> */}
              <input placeholder='Search' style={{ paddingRight: 0, padding: '8px', width: '98%', height: '30px', border: 'none', background: '#EEEEEE' }} />
            </div>
          </Grid>

          <Grid m={'auto'} mr={0} item xs={6} md={6}>
            <div className='' style={{marginLeft: '10px', display: 'flex' }} >
              <p style={{ textAlign: 'center', alignItems: 'center', fontSize:'18px', width:'10%', padding:'10px' }}><BsFillInfoSquareFill/></p>


              <div style={{ display: 'flex', position: 'relative', width:'40%', padding:'4px'}}>
                <div style={{ width: '28px', height: '28px', border: '2px solid rgb(211, 207, 207)', borderRadius: '50%', position: 'absolute' }}>
                  <img style={{ borderRadius: '50%', width: '100%', height: '100%' }} alt="complex" src="https://www.pixelwibes.com/template/e-learn/html/dist/assets/images/lg/avatar3.jpg" />
                </div>

                <div style={{ width: '28px', height: '28px', border: '2px solid rgb(211, 207, 207)', borderRadius: '50%', position: 'absolute', marginLeft: '17px' }}>
                  <img style={{ borderRadius: '50%', width: '100%', height: '100%' }} alt="complex" src="https://www.pixelwibes.com/template/e-learn/html/dist/assets/images/xs/avatar4.jpg" />
                </div>

                <div style={{ width: '28px', height: '28px', border: '2px solid rgb(211, 207, 207)', borderRadius: '50%', position: 'absolute', marginLeft: '34px' }}>
                  <img style={{ borderRadius: '50%', width: '100%', height: '100%' }} alt="complex" src="https://www.pixelwibes.com/template/e-learn/html/dist/assets/images/xs/avatar2.jpg" />
                </div>

                <div style={{ width: '28px', height: '28px', border: '2px solid rgb(211, 207, 207)', borderRadius: '50%', position: 'absolute', marginLeft: '50px' }}>
                  <img style={{ borderRadius: '50%', width: '100%', height: '100%' }} alt="complex" src="https://www.pixelwibes.com/template/e-learn/html/dist/assets/images/lg/avatar3.jpg" />
                </div>

                <div style={{ width: '28px', height: '28px', border: '2px solid rgb(211, 207, 207)', borderRadius: '50%', position: 'absolute', marginLeft: '65px' }}>
                  <img style={{ borderRadius: '50%', width: '100%', height: '100%' }} alt="complex" src="https://www.pixelwibes.com/template/e-learn/html/dist/assets/images/lg/avatar3.jpg" />
                </div>

                <div style={{ width: '28px', height: '28px', border: '2px solid rgb(211, 207, 207)', borderRadius: '50%', position: 'absolute', marginLeft: '80px' }}>
                  <img style={{ borderRadius: '50%', width: '100%', height: '100%' }} alt="complex" src="https://www.pixelwibes.com/template/e-learn/html/dist/assets/images/lg/avatar3.jpg" />
                </div>

                <div style={{ width: '28px', height: '28px', border: '2px solid rgb(211, 207, 207)', borderRadius: '50%', position: 'absolute', marginLeft: '95px' }}>
                  <img style={{ borderRadius: '50%', width: '100%', height: '100%' }} alt="complex" src="https://www.pixelwibes.com/template/e-learn/html/dist/assets/images/lg/avatar3.jpg" />
                </div>
              </div>

              <p style={{ textAlign: 'center', alignItems: 'center', fontSize:'22px', padding:'7px' }}><AiFillBell/></p>
              <p>s</p>
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}
