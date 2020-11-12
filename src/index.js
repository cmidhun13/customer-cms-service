import React from 'react';
import ReactDOM from 'react-dom';
import RenderCrafterComponent from "./components/buttons/RenderCrafterComponent";
import PendingApprovals from "./components/buttons/PendingApprovals";

ReactDOM.render(
  <>
    <PendingApprovals sites={[
      "vendor-ui-template",
      // "vinpro-features",
      // "editorial",
      // "member-ui"
    ]}/>
  </>,
  document.getElementById('crafter-hookup-1')
);
ReactDOM.render(
  <>
    <RenderCrafterComponent site={"vendor-ui-template"}
                            path={"/site/components/widgets/0d9bc921-62f2-29be-a634-912f8814f3c9.xml"}/>
  </>,
document.getElementById('crafter-hookup-2')
)
;
