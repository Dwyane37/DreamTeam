import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import FilterListIcon from '@mui/icons-material/FilterList';
import RegionFilter from './RegionFilter';
import FieldFilter from './FieldFilter';
import CitizenshipFilter from './CitizenshipFilter';
import './Filter.css';
import { useEffect } from 'react';

export default function Filter(props) {
  const [filter, setFilter] = props.handleFilter;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClear = () => {
    setFilter({ country: null, state: null, city: null, field: null, citizenship: [] });
  };
  const handleClose = () => {
    setAnchorEl(null);
    handleClear();
  };

  const handleApply = () => {
    // console.log(filter);
    setAnchorEl(null);
  };

  return (
    <div>
      <FilterListIcon
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleApply}
        // getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div className="filter_section">
          <RegionFilter updateFilter={[filter, setFilter]} />
        </div>
        <div className="filter_section">
          <FieldFilter updateFilter={[filter, setFilter]} />
        </div>
        <div className="filter_section">
          <CitizenshipFilter updateFilter={[filter, setFilter]} />
        </div>
        {/* <button type="submit">Apply</button> */}
        <div className="button-group">
          <Button onClick={handleClear}>Clear</Button>
          <Button onClick={handleApply}>Apply</Button>
        </div>
      </Menu>
    </div>
  );
}
