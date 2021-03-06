import styled from 'styled-components';
import { Rate } from 'antd';
import get from 'styles/getStyle';
import { Icon } from 'components';

export const SkillCardContainer = styled.div`
  display: flex;
  align-items: center;
  padding: ${get('space-12')};
  border: 1px solid ${get('color-grayscale-light')};
  border-radius: ${get('radius-4')};
`;

export const RemoveIcon = styled(Icon)`
  cursor: pointer;
  margin-right: ${get('space-16')};

  path {
    transition: all 0.3s;
  }

  &:hover path {
    fill: ${get('color-danger')};
  }
`;

export const SkillIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: ${get('space-12')};
`;

export const SkillName = styled.div`
  position: relative;
  top: -1px;
  margin-right: ${get('space-12')};
  font-size: ${get('font-size-14')};
  font-weight: 600;
`;

export const RatingDot = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 100%;
  background-color: ${get('color-primary')};
`;

export const Rating = styled(Rate)<{ onBlur: () => void }>`
  margin-right: ${get('space-8')};
  margin-left: auto;
  min-width: 112px;
  max-width: 112px;

  .ant-rate-star + .ant-rate-star {
    margin: 0;

    & + .ant-rate-star {
      margin-left: ${get('space-8')};
    }
  }

  .ant-rate-star-first {
    display: none;
  }

  .ant-rate-star-zero {
    ${RatingDot} {
      background-color: ${get('color-grayscale-light')};
    }
  }

  .ant-rate-star-full {
    ${RatingDot} {
      background-color: ${get('color-primary')};
    }
  }
`;
