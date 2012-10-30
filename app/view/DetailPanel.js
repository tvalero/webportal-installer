Ext.define('SpWebPortal.view.DetailPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'spdetailpanel',
    alias: 'widget.spdetailpanel',

    layout: 'border',

    config: {
	showMap: true,
	showImages: true,
	showFullImageView: true
    },

    requires: [
	'SpWebPortal.view.DetailView', 'SpWebPortal.view.ImageView',
	'SpWebPortal.view.DetailMapPanel'
    ],

    initComponent: function() {
	console.info('DetailPanel.initComponent');

	var cmps = [];

	cmps[0] = Ext.widget('spdetail', {
	    region: 'center'
	});

	cmps[1] = Ext.create('Ext.panel.Panel', {
	    collapsible: true,
	    header: false,
	    split: true,
	    layout: 'border',
	    region: 'east',
	    itemid: 'img-and-map-view',
	    width: 300,
	    items: [
		{
		    xtype: 'spdetailmappanel',
		    region: 'north',
		    height: 300,
		    collapsible: true,
		    split: true,
		    collapsed: !this.getShowMap(),
		},
		{
		    xtype: 'spimageview',
		    region: 'center'
		}
	    ]
	});
	
	this.items = cmps;

	this.callParent(arguments);
    },

    loadRecord: function(record) {
	var frm = this.down('spdetailview');
	this.down('spdetailview').loadRecord(record);

	//set up image view
	var imgView = this.down('spimageview');
	var imgStore = imgView.getImageStore();
	imgStore.removeAll();
	var imagesPresent = imgView.addImgForSpecRec(record) > 0;
	var imgMapView = this.down('[itemid="img-and-map-view"]');
	if (!imagesPresent && !this.getShowMap()) {
	    imgMapView.setTitle('');
	    if (!imgMapView.getCollapsed()) {
		imgMapView.collapse();
	    }
	} else if (imgMapView.getCollapsed()) {
	    //print msg in title for now
	    imgMapView.setTitle("expand to view image(s)");
	}
    }

});
