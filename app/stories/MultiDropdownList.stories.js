import React, { Component } from "react";
import {
	ReactiveBase,
	ReactiveMap,
	MultiDropdownList,
	AppbaseSensorHelper as helper
} from "../app.js";

import { Img } from "./Img.js";
const historyPin = require("./placeholder.svg");

export default class MultiDropdownListDefault extends Component {
	constructor(props) {
		super(props);
		this.onPopoverTrigger = this.onPopoverTrigger.bind(this);
	}

	componentDidMount() {
		helper.ResponsiveStory();
	}

	onPopoverTrigger(marker) {
		return (<div className="popoverComponent row" style={{ margin: "0", maxWidth: "300px" }}>
			<span className="imgContainer col s2" style={{ padding: "0" }}>
				<Img src={marker._source.member.photo} />
			</span>
			<div className="infoContainer col s10">
				<div className="nameContainer">
					<strong>{marker._source.member.member_name}</strong>
				</div>
				<div className="description">
					<p style={{ margin: "5px 0", lineHeight: "18px" }}>is going to&nbsp;
						<a href={marker._source.event.event_url} target="_blank">
							{marker._source.event.event_name}
						</a>
					</p>
				</div>
			</div>
		</div>);
	}

	render() {
		return (
			<ReactiveBase
				aapp="reactivemap-demo"
				username="SL8fiQ1fg"
				password="71ea4254-49ba-4685-8276-e44da225c141"
				type="meetupdata1"
			>
				<div className="row">
					<div className="col s6 col-xs-6">
						<MultiDropdownList
							componentId="CitySensor"
							appbaseField={this.props.mapping.city}
							title="MultiDropdownList"
							size={100}
							{...this.props}
						/>
					</div>

					<div className="col s6 col-xs-6">
						<ReactiveMap
							appbaseField={this.props.mapping.location}
							historicalData
							setMarkerCluster={false}
							defaultMapStyle="Light Monochrome"
							autoCenter
							searchAsMoveComponent
							MapStylesComponent
							title="Reactive Maps"
							showPopoverOn="click"
							historicPin={historyPin}
							onPopoverTrigger={this.onPopoverTrigger}
							defaultZoom={13}
							defaultCenter={{ lat: 37.74, lng: -122.45 }}
							react={{
								and: "CitySensor"
							}}
						/>
					</div>
				</div>
			</ReactiveBase>
		);
	}
}

MultiDropdownListDefault.defaultProps = {
	mapping: {
		city: "group.group_city.raw",
		location: "location"
	}
};
