import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import FolderIcon from '@mui/icons-material/Folder';

export default function MainAppBar() {
  return (
    <AppBar position="relative">
      <Toolbar>
        <FolderIcon sx={{ mr: 2 }} />
        <Typography variant="h6" color="inherit" noWrap>
          My Project - API
        </Typography>
      </Toolbar>
    </AppBar>
  );
}