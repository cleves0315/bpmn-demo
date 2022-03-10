import RuleProvider from 'diagram-js/lib/features/rules/RuleProvider';
import rules from '../../../../view/customMarketing/rules';

/**
 * 自定义规则
 * @param {EventBus} eventBus
 */
export default class CustomRules extends RuleProvider {
  constructor(eventBus, injector) {
    super(eventBus, injector);
    injector.invoke(RuleProvider, this);
  }

  init = () => {
    rules(this);
  }
}


CustomRules.$inject = ['eventBus', "injector"];
