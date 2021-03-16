import {createStyles, Theme, withStyles} from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";

export const PaginationCell = withStyles((theme: Theme) =>
    createStyles({
        body: {
            fontSize: 50,
            padding: 10,
        },
    })
)(TableCell);