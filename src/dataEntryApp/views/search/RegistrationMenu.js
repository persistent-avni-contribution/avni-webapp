import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { AddIcon, InternalLink } from "../../../common/components/utils";
import React from "react";
import Menu from "@material-ui/core/Menu";
import { withRouter } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { useTranslation } from "react-i18next";
import { enableReadOnly } from "common/constants";

const useStyle = makeStyles(theme => ({
  createButton: {
    margin: theme.spacing(1)
  }
}));

const RegistrationMenu = ({ types }) => {
  const classes = useStyle();
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = () => event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <div>
      {!enableReadOnly ? (
        <Button
          size="medium"
          className={classes.createButton}
          color={"primary"}
          onClick={handleClick()}
        >
          <AddIcon /> {t("create")}
        </Button>
      ) : (
        ""
      )}
      <Menu
        id="create-menu"
        anchorEl={anchorEl}
        keepMounted
        open={!!anchorEl}
        onClose={handleClose}
      >
        {types.map((type, key) => (
          <InternalLink
            key={key}
            to={`/app/register?type=${type.name}`}
            onClick={handleClick(type)}
          >
            <MenuItem>
              {" "}
              <AddIcon /> {t(type.name)}{" "}
            </MenuItem>
          </InternalLink>
        ))}
      </Menu>
    </div>
  );
};

const mapStateToProps = state => ({
  types: state.dataEntry.metadata.operationalModules.subjectTypes
});

export default withRouter(connect(mapStateToProps)(RegistrationMenu));
