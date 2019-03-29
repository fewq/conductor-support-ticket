import Board from "../components/kanbanComponents/Board";
import { connect } from "react-redux";

const mapStateToProps = ({ domainData, kanbanState }) => ({
  allLists: domainData.lists.allLists,
  listByIds: domainData.lists.byId,
  listCards: kanbanState.listCards
});

export default connect(mapStateToProps)(Board);
