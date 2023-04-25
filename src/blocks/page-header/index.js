import { registerBlockType } from "@wordpress/blocks";
import { RichText, useBlockProps, InspectorControls } from "@wordpress/block-editor";
import { PanelBody, ToggleControl } from '@wordpress/components';
import { __ } from "@wordpress/i18n";
import icons from "../../icons";
import "./main.css";

registerBlockType("wordpress-plus/page-header", {
  icon: icons.primary,
  edit({ attributes, setAttributes }) {
    const { content, showCategory } = attributes;
    const blockProps = useBlockProps();

    return (
      <>
        <InspectorControls>
          <PanelBody title={__('General', 'wordpress-plus')}>
            <ToggleControl
              label={__('Show Category', 'wordpress-plus')}
              checked={showCategory}
              onChange={newVal => setAttributes({ showCategory: newVal })}
              help={
                showCategory ?
                __('Category Shown', 'wordpress-plus') :
                __('Custom Content Shown', 'wordpress-plus')
              }
            />
          </PanelBody>
        </InspectorControls>
        <div {...blockProps}>
            <div className="inner-page-header">
              {showCategory ? 
                <h1>{__('Category: Some Category', 'wordpress-plus')}</h1> 
                :
                <RichText
                    tagName="h1"
                    placeholder={__("Heading", "wordpress-plus")}
                    value={content}
                    onChange={newVal => setAttributes({ content: newVal })}
                />
              }
            </div>
        </div> 
      </>
    );
  },
});
